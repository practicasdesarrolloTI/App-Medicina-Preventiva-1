import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";

const PatientInfoScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Botón para regresar al menú */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Icono de perfil centrado */}
      <View style={styles.profileIconContainer}>
        <MaterialIcons name="account-circle" size={100} color={colors.primary} />
      </View>

      {/* Información del Paciente */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}><Text style={styles.bold}>Nombre:</Text> Pablo Pérez Gómez</Text>
        <Text style={styles.label}><Text style={styles.bold}>Edad:</Text> 56 años</Text>
        <Text style={styles.label}><Text style={styles.bold}>Sexo:</Text> Masculino</Text>
        <Text style={styles.label}><Text style={styles.bold}>Dirección:</Text> Cra 23-65-123</Text>
        <Text style={styles.label}><Text style={styles.bold}>Teléfono:</Text> 34988934</Text>
        <Text style={styles.label}><Text style={styles.bold}>Ciudad:</Text> Barranquilla</Text>
        <Text style={styles.label}><Text style={styles.bold}>Departamento:</Text> Atlántico</Text>
        <Text style={styles.label}><Text style={styles.bold}>Antecedentes personales:</Text> Hipertensión Arterial</Text>
        <Text style={styles.label}><Text style={styles.bold}>Médico de cabecera:</Text> Antonio Castro López</Text>
        <Text style={styles.label}><Text style={styles.bold}>Especialidad:</Text> Médico experto Cardiovascular</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: "flex-start",
    padding: 15,
    marginTop: 30,
    marginBottom: 20, 
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
  profileIconContainer: {
    alignItems: "center",
    margin: 40, 
  },
  infoContainer: {
    alignSelf: "center",
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default PatientInfoScreen;
