import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const uploadUrl = "http://127.0.0.1:5000/api/upload";

export default function UploadScreen() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File | null) => {
    setErrorMessage(null);
    if (!file) {
      setStatusMessage(null);
      setSelectedFileName(null);
      return;
    }

    setSelectedFileName(file.name);
    const validExtensions = [".xls", ".xlsx"];
    if (!validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      setErrorMessage("Please select a valid Excel file (.xls or .xlsx).");
      return;
    }

    setIsUploading(true);
    setStatusMessage("Uploading file...");

    try {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.text();
      setStatusMessage(
        `Upload successful: ${result || "Server accepted file."}`,
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
      setStatusMessage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const files = event.dataTransfer?.files;
    if (files?.length) {
      handleFile(files[0]);
    }
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const dragHandlers: any =
    Platform.OS === "web"
      ? {
          onDragEnter: onDragOver,
          onDragOver: onDragOver,
          onDragLeave,
          onDrop,
        }
      : {};

  const openFileBrowser = () => {
    if (Platform.OS === "web") {
      inputRef.current?.click();
    } else {
      setErrorMessage(
        "File upload is supported on web only. Please open this screen in a browser.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Excel Upload</Text>
        <Text style={styles.subtitle}>
          Drag and drop an Excel file here, or browse to select a file.
        </Text>

        <View
          style={[styles.dropZone, isDragActive && styles.dropZoneActive]}
          {...(dragHandlers as any)}
        >
          <Text style={styles.dropZoneText}>
            {isDragActive
              ? "Release to upload the Excel file"
              : "Drop your .xls or .xlsx file here"}
          </Text>
          <Text style={styles.hintText}>Backend URL: {uploadUrl}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={openFileBrowser}>
          <Text style={styles.buttonText}>Browse file</Text>
        </TouchableOpacity>

        {selectedFileName ? (
          <Text style={styles.fileName}>Selected file: {selectedFileName}</Text>
        ) : null}

        {isUploading ? (
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="#0855ff"
          />
        ) : null}

        {statusMessage ? (
          <Text style={styles.statusText}>{statusMessage}</Text>
        ) : null}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {Platform.OS === "web" ? (
          <input
            ref={inputRef}
            type="file"
            accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            style={styles.hiddenInput}
            onChange={(event: any) =>
              handleFile(event.target.files?.[0] ?? null)
            }
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 24,
  },
  dropZone: {
    minHeight: 220,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginBottom: 24,
  },
  dropZoneActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  dropZoneText: {
    fontSize: 16,
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 10,
  },
  hintText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  fileName: {
    fontSize: 15,
    color: "#1e293b",
    marginBottom: 12,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    color: "#0f766e",
    textAlign: "center",
  },
  errorText: {
    fontSize: 15,
    color: "#b91c1c",
    textAlign: "center",
  },
  spinner: {
    marginVertical: 16,
  },
  hiddenInput: {
    display: "none",
  } as any,
});
