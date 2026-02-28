import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";

// 1. Ajustado os tipos para bater com o Dashboard (receita/despesa)
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "receita" | "despesa"; 
  category: string;
  date: Date;
  receiptUrl?: string; 
}

// 2. Adicionado o totalBalance no "contrato" (interface)
interface TransactionContextData {
  transactions: Transaction[];
  loading: boolean;
  totalBalance: number; 
  addTransaction: (data: Omit<Transaction, "id" | "date" | "receiptUrl">, imageBase64?: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // 3. CÁLCULO DO SALDO TOTAL
  // O useMemo faz com que o cálculo só rode quando a lista de transações mudar
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, current) => {
      return current.type === 'receita' 
        ? acc + current.amount 
        : acc - current.amount;
    }, 0);
  }, [transactions]);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Busca otimizada: o 'where' já filtra o usuário, não precisa de filtro manual depois
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("date", "desc") 
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Converte o Timestamp do Firebase para Date do JS
        date: doc.data().date?.toDate() || new Date(),
      })) as Transaction[];

      setTransactions(transactionsData);
      setLoading(false);
    }, (error) => {
      console.error("Erro no Firestore:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addTransaction = async (data: any, imageBase64?: string) => {
    if (!user) throw new Error("Usuário não autenticado");

    try {
      await addDoc(collection(db, "transactions"), {
        ...data,
        userId: user.uid,
        date: Timestamp.fromDate(new Date()),
        receiptUrl: imageBase64 || null 
      });
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      throw error;
    }
  };

  return (
    // 4. Exportando o totalBalance aqui no Provider
    <TransactionContext.Provider value={{ 
      transactions, 
      loading, 
      totalBalance, 
      addTransaction 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);