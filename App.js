import Navigate from "./src/navigate/Navigate";
import {AuthProvider} from "./src/context/AuthContext"
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  return (
      <AuthProvider>
          <AlertNotificationRoot>
              <Navigate/>
          </AlertNotificationRoot>
      </AuthProvider>
  );
}
