import './App.css';
import Owner from './page/Owner';
import Home from './components/Home'
import Patient from './page/Patient';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PatientInfo from './page/PatientInfo';
import Hospital from './page/Hospital';
import Approval from './page/Approval';
import Remove from './page/Remove';
import LabAssist from './page/LabAssist';
import Doctors from './page/Doctors';
import BoxSubmit from './components/BoxSubmit';
import MedInfo from './components/MedInfo';
import GetId from './components/GetId';
import GetPInfo from './components/GetPInfo';
import GetMInfo from './components/GetMInfo';
import LabApproval from './page/LabApproval';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
    <Route
    path="/owner"
    element={<Owner/>}
    />
    <Route
    path="/"
    element={<Home />}
    />
    <Route
    path="/patient"
    element={<Patient/>}
    
    />
    <Route
    path="/patient/patientInfo"
    element={<PatientInfo/>}
    
    />
    <Route
    path="/patient/approve"
    element={<Approval/>}
    
    />
    <Route
    path="/patient/approveLab"
    element={<LabApproval/>}
    
    />
    <Route
    path="/patient/remove"
    element={<Remove/>}
    
    />
    <Route
    path="/hospital"
    element={<Hospital/>}
    
    />
    <Route
    path="/labAssist"
    element={<LabAssist/>}
    />
    <Route
    path="/doctors"
    element={<Doctors/>}
    />
    <Route
    path="/creditScore"
    element={<BoxSubmit/>}
    />
    <Route
    path="/getMedInfo"
    element={<MedInfo/>}
    />
    <Route
    path="/getId"
    element={<GetId/>}
    />
    <Route
    path="/personalDetais"
    element={<GetPInfo/>}
    />
    <Route
    path="/GMINfo"
    element={<GetMInfo/>}
    />

</Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
