import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { API_BASE_URL } from "@/services/auth";
import { StorageService } from "@/services/storage";
import { useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface ListItem {
  id: string;
  title: string;
  description: string;
}

export default function ListScreen() {
  const glob = useGlobalSearchParams();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleIPReportGen = async()=>{
     setIsLoading(true)
      const accessToken = await StorageService.getAccessToken()
      const reports = await fetch(
        `${API_BASE_URL}/api/assets/process_common/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            researchTopic: topic,
            description: "",
            advanced_settings: {
              max_years: "5",
              countries: ["Worldwide"],
              sources: ["wokelo", "www"],
              custom_links: [],
              keywords: [],
              companies: [],
              company_categories: [],
              selected_attributes: [
                75, 77, 72, 70, 71, 124, 375, 64, 67, 139, 69, 65, 66, 374, 76,
                156, 125, 276, 68, 73, 74, 126, 127, 128, 138, 376,
              ],
              questions: [],
              component: "industry_qna",
            },
            custom_files: [],
            component: "industry_qna",
          }),
        }
      );
      setIsLoading(false)
      return reports.json()
    }
  return (
    <ThemedView style={styles.container}>
      {glob.mode === "cp" ? (
        <></>
      ) : (
        <>
          <ThemedText style={styles.h1}>Industry Primer</ThemedText>
          <ThemedView
            style={{
              width: "100%",
              paddingLeft: 15,
              paddingRight: 15,
              maxWidth: 500,
            }}
          >
            <ThemedText style={styles.h4}>Topic</ThemedText>
            <TextInput
              value={topic}
              onChangeText={(e) => setTopic(e)}
              style={{
                height: 50,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 16,
                fontSize: 16,
                backgroundColor: "#f8f9fa",
                color: "#000",
                width: "100%",
              }}
            />
            <TouchableOpacity
              style={[
                {
                  height: 50,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 16,
                  backgroundColor: "#272727",
                },
                {
                  opacity: isLoading ? 0.7 : 1,
                },
              ]}
              onPress={() => {
                handleIPReportGen()
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText style={{ fontWeight: 500, fontSize: 16 }}>
                  Generate Report
                </ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  h1: {
    fontWeight: 500,
    fontSize: 22,
  },
  h4: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});
