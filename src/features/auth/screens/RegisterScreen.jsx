import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native"
import { useForm, Controller } from "react-hook-form"

import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme";
import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import { useAuth } from "../hooks/useAuth";

import kinalSportsLogo from "../../../../assets/kinal_sports.png"

const RegisterScreen = ({ navigation }) => {
    const { handleRegister } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            username: "",
            phone: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data) => {
        try {
            await handleRegister(data)
            Alert.alert(
                "Registro exitoso",
                "Tu cuenta ha sido creada. Inicia sesión para comenzar.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            )
        } catch (error) {
            console.error(error)
            const message = error.response?.data?.message || "Error al registrarse"
            Alert.alert("Error", message)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={kinalSportsLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.subtitle}>Únete a Kinal Sports</Text>
                </View>

                <View style={styles.form}>
                    {/* Nombre */}
                    <Controller
                        control={control}
                        rules={{ required: "El nombre es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Nombre"
                                placeholder="Tu nombre"
                                onChangeText={onChange}
                                value={value}
                                error={errors.name?.message}
                            />
                        )}
                        name="name"
                    />

                    {/* Apellido */}
                    <Controller
                        control={control}
                        rules={{ required: "El apellido es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Apellido"
                                placeholder="Tu apellido"
                                onChangeText={onChange}
                                value={value}
                                error={errors.lastName?.message}
                            />
                        )}
                        name="lastName"
                    />

                    {/* Usuario */}
                    <Controller
                        control={control}
                        rules={{ required: "El usuario es requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Usuario"
                                placeholder="nombre_usuario"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.username?.message}
                            />
                        )}
                        name="username"
                    />

                    {/* Teléfono */}
                    <Controller
                        control={control}
                        rules={{
                            required: "El teléfono es requerido",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Número de teléfono inválido"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Teléfono"
                                placeholder="Ej: 12345678"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="phone-pad"
                                error={errors.phone?.message}
                            />
                        )}
                        name="phone"
                    />

                    {/* Email */}
                    <Controller
                        control={control}
                        rules={{
                            required: "El email es requerido",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Correo electrónico inválido"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Email"
                                placeholder="correo@ejemplo.com"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                error={errors.email?.message}
                            />
                        )}
                        name="email"
                    />

                    {/* Contraseña */}
                    <Controller
                        control={control}
                        rules={{
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Contraseña"
                                placeholder="••••••••"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.password?.message}
                                secureTextEntry
                            />
                        )}
                        name="password"
                    />

                    <Button
                        title="Registrarse"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                        <Text
                            style={styles.link}
                            onPress={() => navigation.navigate("Login")}>
                            Inicia Sesión
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.xl,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
    },
    logo: {
        height: 80,
        width: 200,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.secondary,
        marginTop: SPACING.sm,
        fontWeight: "500",
    },
    form: {
        width: "100%",
    },
    button: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SPACING.xl,
        marginBottom: SPACING.md, // Espacio extra abajo para el ScrollView
    },
    footerText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textLight,
    },
    link: {
        fontSize: FONT_SIZE.md,
        color: COLORS.primary,
        fontWeight: "700",
    },
});

export default RegisterScreen;