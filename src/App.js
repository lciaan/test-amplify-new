import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Amplify, {Auth, Storage} from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import {Button, Container, Table, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

  useEffect( () => {
    Amplify.configure({
      Auth: {
        identityPoolId: 'eu-central-1:38767a04-2474-4f6e-97d5-47222579e071', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'eu-central-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'eu-central-1_xz7njhgNs', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '4ih7b5nhlmupnblo61oee2gr32', 

      },
      Storage:{
        AWSS3:{
          bucket: 'cognito-demo-amplify-131313', //REQUIRED -  Amazon S3 bucket name
          region: 'eu-central-1', //OPTIONAL -  Amazon service region
        }
      }
    });
  },[]);

  const loadImages = () => {
    Storage.list('')
    .then((files) => {
      console.log(files);
      setFiles(files);
    }).
    catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileLoad = () => {
    const filename = ref.current.files[0].name;
    console.log(ref.current.files[0]);
    Storage.put(filename, 
                ref.current.files[0],
                { contentType: ref.current.files[0].type },
                {progressCallback: (progress) => {
                  setProgress(Math.round(progress.loaded/progress.total *100)+'%');
                  console.log(Math.round(progress.loaded/progress.total *100)+'%');
                }
              })
    .then(resp => {
      console.log(resp);
      loadImages();
    }).catch (err => {console.log(err);});
  }

  const handleShow = (file) => {
    Storage.get(file).then(resp => {
      console.log(resp);
      setImage(resp)
    }).catch(err => {console.log(err);});
  }
  const handleDelete = (file) => {
    Storage.remove(file).then( resp => {
      console.log(resp);
      loadImages();
    }).catch(err => {console.log(err);})
  }

  const handleClear = () => {
      loadImages();
      setImage()
  }

  return (
    //<div className="App">
    <Container>
      <Row>
      <header className="App-header">
      <Row>
        <h1 font-weight="bold" >Welcome to the react AWS Storage Demo!</h1>
      </Row>
      <br />
      <br />
      <br />
      <br />
       <Row>
        <input ref={ref} type="file" onChange={handleFileLoad}/>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {files.map((file,i) => (
              <tr key = {file.key}>
                <td>{i}</td>
                <td>{file.key}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(file.key)}>Show</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(file.key)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="info" onClick={() => handleClear()}>Clear</Button>
        <img src={image} width="600"/>
      </header>
      </Row>
      </Container>
    //</div>
  );
}

// const styles = {
//   container: { width: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20},
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

export default App;