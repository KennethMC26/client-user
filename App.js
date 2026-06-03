import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
 
import Button from "./src/shared/components/Button";
import Input from "./src/shared/components/Input";
import {
  Card,
  EmptyState,
  LoadingSpinner,
} from "./src/shared/components/Common";
 
export default function App() {
  return (
    <View style={styles.container}>
      <Input label="Correo" placeholder="Ingresa tu correo" />
 
      <Button
        title="Iniciar Sesión"
        onPress={() => console.log("Botón presionado")}
      />
 
      <Card>
        <Text>Nombre de la Cancha</Text>
        <Text>Cancha Central</Text>
      </Card>
      <Card>
        <Text>Nombre del equipo</Text>
        <Text>Las Águilas</Text>
      </Card>
      <Card>
        <Text>Mis Reservaciones</Text>
        <Text>10/06/26</Text>
      </Card>
      <Card>
        <Text>Nombre del Torneo</Text>
        <Text>Inter Talleres</Text>
      </Card>
 
      <EmptyState message="No hay movimientos" />
 
      <LoadingSpinner />
 
      <StatusBar style="auto" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 15,
  },
});