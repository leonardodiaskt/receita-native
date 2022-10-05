import react, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ImageBackground } from "react-native-web";


const numColumns = 1;

//****************************************************************** */

const images = [
  {
    name: "Carnes",
    img: require("../../../assets/carne.jpg"),
  },

  {
    name: "italiana",
    img: require("../../../assets/carne.jpg"),
  },

  {
    name: "brasileira",
    img: require("../../../assets/carne.jpg"),
  },

  {
    name: "alema",
    img: require("../../../assets/carne.jpg"),
  },
];

//****************************************************************** */

import { db } from '../../config/firebaseconfig';

//****************************************************************** */

export default function Carnes({ navigation }) {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [carnes, setCarnes] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");

  const dataCollectionRef = collection(db, "carnes")

  //ADD CRUD

  async function addReceita() {
    const receita = await addDoc(dataCollectionRef, {
      nome,
      descricao,
      url
    });
    console.log(receita);
  }

  //GET CRUD

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef)
      setCarnes((data.docs.map((doc, item) => ({ ...doc.data(), id: doc.id, image: images[item] }))));
    };
    getData();
  }, [])


  return (
    <>
    <ImageBackground 
      source={require('../../../assets/fundo2.jpg')}
      style={{width:'100%' , height:"100%"}}>

      <View style={styles.container}>
        <ScrollView styles={{ marginTop: 200 }}>
          <FlatList
            data={carnes}
            numColumns={numColumns}
            keyExtractor={item => item.nome}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardIMG}>
                  <Text style={styles.description1}>{item.nome}</Text>
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center" }} onPress={() => { setVisivel(true) }}>
                    <Image style={{ width: '100%', height: 217, alignItems: 'center', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }} source={{ uri: item.url }} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          >
          </FlatList>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visivel}
              style={styles.modal}
            >
              <FlatList
                data={carnes}
                numColumns={numColumns}
                keyExtractor={item => item.nome}
                renderItem={({ item }) => (
                  <View style={styles.modal}>                                       
                      <Image style={{ width: '100%', height: 250, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5 }} source={{ uri: item.url }} />
                      <Text style={styles.description2}>{item.nome}</Text>
                      <Text style={styles.description}>{item.descricao}</Text>
                    <TouchableOpacity
                      style={styles.botao11}
                      onPress={() => {
                        setVisivel(false);
                      }}>
                      <Text style={styles.tex}>Voltar</Text>
                    </TouchableOpacity>

                  </View>
                )}
              >

              </FlatList>



            </Modal>

          </View>

        </ScrollView>
        <TouchableOpacity style={styles.buttonNew} onPress={() => { setVisible(true) }}>
          <Text style={{ color: '#fffff', fontWeight: 'bold', fontSize: 35, marginBottom: 10 }}>+</Text>
        </TouchableOpacity>
        <View>
          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={visible}
          >
            <View style={styles.modal}>
              <TouchableOpacity style={styles.botao12} onPress={() => { setVisible(false) }}>
                <Text style={styles.tex}>X</Text>
              </TouchableOpacity>
              <input
                type="text"
                placeholder='Nome da Receita'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.inputt}
              />
              <input
                type="text"
                placeholder='Descrição da Receita'
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                style={styles.inputt}
              />
              <input
                type='text'
                placeholder='Url da Imagem'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={styles.inputt}
              />
              <button onClick={addReceita} style={styles.add}>Adicionar</button>
            </View>

          </Modal>
        </View>
      </View>

    </ImageBackground>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',

  },
  card: {
    flexDirection: 'row',

  },
  cardIMG: {
    width: 390,
    height: 250,
    marginTop: 25,
    paddingBottom: 35,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    cursor: 'pointer'

  },
  imgCard: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    alignItems: 'center',

  },
  description: {
    fontSize: 20,
    height: 25,
    marginBottom: '5%',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    textAlign: 'center'
  },

  description1: {
    fontSize: 20,
    height: 25,
    fontWeight: "bold",


    borderTopRightRadius:6,
    borderTopLeftRadius:6,
    
    backgroundColor:'#e8e8e8',
    width:'100%',
    height: "50%",
    textAlign: 'center',
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
     
  },

  description2: {
    fontSize: 17,
    height: 40,
    marginBottom: '5%',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    fontWeight: "bold",

    textAlign: 'center',
    width: '100%',
    color: 'black',
    backgroundColor: '#DBDBDB'
  },

  modal: {
    padding: 20,
    margin: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    elevation: 10,
    height: 500,

    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 9,},
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },

  botao11: {
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 70,
    height: 25,
    alignSelf: 'flex-end',
    marginTop: 115,
    alignSelf: 'center',
    borderRadius: 20
  },

  botao12: {
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    width: 35,
    height: 35,
    alignSelf: 'flex-end',
    marginBottom: 18

  },
  tex: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15
  },

  buttonNew: {
    width: 40,
    height: 40,
    marginTop: 10,
    backgroundColor: "#3EA9F0",
    borderRadius: "100%",
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },

  inputt: {
    borderRadius: 7,
    width: '70%',
    height: 20,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: 15,
    textAlign: 'center',

  },
  add: {
    borderRadius: 20,
    width: '50%',
    height: 30,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20
  },
  select: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: '15%',
  },
  texSelec: {
    fontSize: 20
  }

});
