import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"



export default function App() {
  const [ columns , setColumn ] = React.useState([
    "id",
    "type",
    "price"
  ])
  const [ direction , setDirection ] = React.useState(null)
  const [ selectedColumn, setSelectedColumn] = React.useState(null)
  const [ pets , setPets ] = React.useState([
    
  ]);

  React.useEffect( () => {
  axios
  .get('http://petstore-demo-endpoint.execute-api.com/petstore/pets')
  .then(function (response) {
    // handle success
    setPets(response.data);
  })
  .catch(function (error) {
    // handle error
    alert(error);
  })
  }, []);
  
  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> {
                  sortTable(column)
                  console.log(column)
                  console.log(direction)
                  console.log(pets)
              }
                
                }>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>  
  )
  return (
    <View style={styles.container}>
      <FlatList 
        data={pets}
        style={{width:"90%"}}
        keyExtractor={(item, index) => index+""}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({item, index})=> {
          return (
            <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
              <Text style={styles.columnRowTxt}>{item.id}</Text>
              <Text style={styles.columnRowTxt}>{item.type}</Text>
              <Text style={styles.columnRowTxt}>{item.price}</Text>
            </View>
          )
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    marginLeft: "7.5%",
    width:"23%",
    textAlign:"center",
  }
});