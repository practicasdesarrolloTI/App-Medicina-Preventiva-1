import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../themes/colors"; 
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { fetchResults } from "../services/resultService";

type Props = NativeStackScreenProps<RootStackParamList, "Resultados">;

type Resultado = {
  id: string;
  fechaRealizacion: string;
  examen: string;
  estado: string;
  programa: string;
};

const ResultsScreen: React.FC<Props> =({ navigation} ) => {
  const [resultados, setResultados] = useState<Resultado[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchResults();
      setResultados(data);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
<Text style={styles.title}>Tus Resultados</Text>
      {/* Lista de Resultados */}
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              <MaterialIcons name="event" size={16} /> Fecha de realización: {item.fechaRealizacion}
            </Text>
            <Text style={styles.text}>
              <MaterialIcons name="science" size={16} /> Examen realizado: {item.examen}
            </Text>
            <Text style={styles.text}>
              <FontAwesome5 name="notes-medical" size={16} /> Programa: {item.programa}
            </Text>
            <Text style={[styles.status, item.estado === "Disponible" ? styles.available : styles.pending]}>
              {item.estado}
            </Text>

            {/* Botón de Descargar si está disponible */}
            {item.estado === "Disponible" && (
              <TouchableOpacity style={styles.downloadButton} onPress={() => console.log(`Descargando ${item.examen}`)}>
                <MaterialIcons name="file-download" size={20} color="white" />
                <Text style={styles.downloadText}>Descargar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: "flex-start",
    padding: 15,
    marginTop: 30,
    marginBottom: 40, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary,
  },
  backButton: {
    top: 30,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  card: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  available: {
    backgroundColor: "green",
    color: "#fff",
  },
  pending: {
    backgroundColor: colors.secondary,
    color: "#fff",
  },
  downloadButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ResultsScreen;
