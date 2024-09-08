import Navigate from "./src/navigate/Navigate";
import {AuthProvider} from "./src/context/AuthContext";

export default function App() {
  return (
      <AuthProvider>
          <Navigate/>
      </AuthProvider>
  );
}
