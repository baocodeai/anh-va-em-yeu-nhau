/**
 * =========================================================================
 * CẤU HÌNH GOOGLE FIREBASE REALTIME DATABASE CHO AI & MAZE
 * =========================================================================
 * Bạn có thể điền thông tin trực tiếp vào đây hoặc dán vào ô "Cài đặt Firebase"
 * trên giao diện web (trong nút "☁️ Đồng Bộ & Cloud").
 */

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string; // Quan trọng: https://<project-id>-default-rtdb.firebaseio.com
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "AIzaSyBrbmCl36Sun72tfrypJzPlJo6wva6M3jc",
  authDomain: "tinh-cau-ai-maze.firebaseapp.com",
  databaseURL: "https://tinh-cau-ai-maze-default-rtdb.firebaseio.com",
  projectId: "tinh-cau-ai-maze",
  storageBucket: "tinh-cau-ai-maze.firebasestorage.app",
  messagingSenderId: "589960224720",
  appId: "1:589960224720:web:c2ecab9f3f0a46039ee3d5",
  measurementId: "G-C40YSBP2LL"
};
