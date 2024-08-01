import './App.css'
import HomeScreen from './screens/HomeScreen'
import {Route, Routes} from "react-router-dom";
import AuthScreen from "./screens/AuthScreen.tsx";
import FirestoreWriteScreen from "./screens/FirestoreWriteScreen.tsx";
import ImageUploadScreen from "./screens/ImageUploadScreen.tsx";

const App=()=> {


  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/firestore" element={<FirestoreWriteScreen />} />
        <Route path="/storage" element={<ImageUploadScreen />} />
    </Routes>
  );
};

export default App
