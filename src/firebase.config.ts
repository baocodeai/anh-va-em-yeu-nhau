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
  databaseURL?: string; // Quan trọng nhất: https://<project-id>-default-rtdb.firebaseio.com
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
