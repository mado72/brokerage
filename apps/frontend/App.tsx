import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "./theme/colors";

const DEFAULT_URL = "http://localhost:3000";

export default function App() {
  const [baseUrl, setBaseUrl] = useState<string>(DEFAULT_URL);
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("admin123");
  const [message, setMessage] = useState<string>("hello from expo");
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canCallProtected = useMemo(() => token.trim().length > 0, [token]);

  const clearFeedback = () => {
    setResult("");
    setError("");
  };

  const login = async () => {
    clearFeedback();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data: { token?: string; error?: unknown } = await response.json();

      if (!response.ok) {
        setToken("");
        setError(typeof data?.error === "string" ? data.error : "Login failed");
        return;
      }

      setToken(data.token || "");
      setResult("Authenticated. JWT token received.");
    } catch {
      setError("Could not connect to backend. Check base URL and backend status.");
    } finally {
      setIsLoading(false);
    }
  };

  const callProtectedEcho = async () => {
    clearFeedback();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      });

      const data: { message?: string; error?: unknown } = await response.json();

      if (!response.ok) {
        const apiError =
          typeof data?.error === "string"
            ? data.error
            : JSON.stringify(data?.error || "Request failed");
        setError(apiError);
        return;
      }

      setResult(`Protected response: ${data.message}`);
    } catch {
      setError("Could not connect to backend. Check base URL and backend status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>JWT Auth Demo</Text>
        <Text style={styles.subtitle}>Use login to get a token, then call protected endpoints.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Backend Base URL</Text>
          <TextInput style={styles.input} value={baseUrl} onChangeText={setBaseUrl} autoCapitalize="none" />
          <Text style={styles.helper}>Android emulator tip: use http://10.0.2.2:3000</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

          <TouchableOpacity style={styles.primaryButton} onPress={login} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? "Please wait..." : "Login and Get JWT"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Message for /echo</Text>
          <TextInput style={styles.input} value={message} onChangeText={setMessage} />

          <TouchableOpacity
            style={[styles.secondaryButton, !canCallProtected && styles.disabledButton]}
            onPress={callProtectedEcho}
            disabled={isLoading || !canCallProtected}
          >
            <Text style={styles.buttonText}>Call Protected /echo</Text>
          </TouchableOpacity>

          <Text style={styles.tokenLabel}>Current Token (preview)</Text>
          <Text style={styles.tokenValue}>{token ? `${token.slice(0, 28)}...` : "No token yet"}</Text>

          {result ? <Text style={styles.success}>{result}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgWarmWhite
  },
  container: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    color: colors.textCharcoal,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: colors.textMutedBrown,
    marginBottom: 20
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft
  },
  label: {
    color: colors.textCharcoal,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600"
  },
  helper: {
    color: colors.textMutedBrown,
    fontSize: 12,
    marginTop: 6
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    color: colors.textCharcoal,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: colors.accentSand,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  secondaryButton: {
    marginTop: 14,
    backgroundColor: colors.accentBeige,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  disabledButton: {
    opacity: 0.5
  },
  buttonText: {
    color: colors.textCharcoal,
    fontWeight: "700"
  },
  tokenLabel: {
    color: colors.textCharcoal,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: "600"
  },
  tokenValue: {
    color: colors.textMutedBrown,
    fontSize: 12
  },
  success: {
    marginTop: 14,
    color: colors.successSoft,
    fontWeight: "600"
  },
  error: {
    marginTop: 14,
    color: colors.errorSoft,
    fontWeight: "600"
  }
});
