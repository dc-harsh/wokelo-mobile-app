import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { API_BASE_URL } from "@/services/auth";
import { StorageService } from "@/services/storage";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDebounce } from "use-debounce";

interface ListItem {
  id: string;
  title: string;
  description: string;
}

export default function ListScreen() {
  const glob = useGlobalSearchParams();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleIPReportGen = async () => {
    setIsLoading(true);
    const accessToken = await StorageService.getAccessToken();
    const reports = await fetch(`${API_BASE_URL}/api/assets/process_common/`, {
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
            75, 77, 72, 70, 71, 124, 375, 64, 67, 139, 69, 65, 66, 374, 76, 156,
            125, 276, 68, 73, 74, 126, 127, 128, 138, 376,
          ],
          questions: [],
          component: "industry_qna",
        },
        custom_files: [],
        component: "industry_qna",
      }),
    });
    setIsLoading(false);
    router.replace('/')
    return reports.json();
  };

  const [companySearch, setCompanySearch] = useState("");
  const [debauncedValue] = useDebounce(companySearch, 1000);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [permalink, setPermalink] = useState("");
  const [companyDetailsLoading, setCompanyDetailsLoading] = useState(false);
  
  const handelCompanySearch = async () => {
    setSearchResults([]);
    setSearchLoading(true);
    const accessToken = await StorageService.getAccessToken();
    const reports = await fetch(
      `${API_BASE_URL}/api/assets/get_company_list/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: debauncedValue,
          search_by: "company name",
          company_type: "all",
        }),
      }
    );
    reports.json().then((res) => {
      setSearchResults(res?.data || []);
      setSearchLoading(false);
    });
  };
  useEffect(() => {
    if (glob.mode !== "cp") {
      return;
    }
    handelCompanySearch();
  }, [debauncedValue]);

  const [companyDetails, setCompanyDetails] = useState<any>({});

  const handleGetCompDetails = async () => {
    const accessToken = await StorageService.getAccessToken();
    const reports = await fetch(
      `${API_BASE_URL}/api/assets/get_company_details_from_name/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          permalink: permalink,
          financials: false,
        }),
      }
    );
    reports.json().then((res) => {
      setCompanyDetails(res?.data || []);
      setCompanyDetailsLoading(false);
    });
  };
  useEffect(() => {
    if (!permalink) {
      return;
    }
    setCompanyDetailsLoading(true);
    handleGetCompDetails();
  }, [permalink]);


   const handleCPReportGen = async () => {
    setIsLoading(true);
    const accessToken = await StorageService.getAccessToken();
    const reports = await fetch(`${API_BASE_URL}/api/assets/process_common/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
    "reportType": "company_primer",
    "payload": {
        "company_name": companyDetails.org_name,
        "permalink": companyDetails.permalink,
        "workbook_name": companyDetails.org_name,
        "industry_research_topic": companyDetails.product_category,
        "advanced_settings": {
            "companies": [],
            "selected_attributes": [
                78,
                79,
                81,
                130,
                341,
                342,
                82,
                332,
                333,
                334,
                335,
                337,
                336,
                338,
                339,
                340,
                84,
                85,
                86,
                87,
                88,
                89,
                90,
                91,
                368,
                367,
                343,
                103,
                104,
                112,
                110,
                115,
                93,
                370,
                317,
                120,
                121,
                237,
                94,
                373,
                111,
                371,
                95,
                362,
                372,
                96,
                97,
                98,
                99,
                100,
                101,
                102,
                108,
                105,
                106,
                107,
                113,
                114,
                122,
                357,
                358,
                359,
                361,
                360,
                329,
                330,
                331,
                369
            ]
        },
        "custom_files": [],
        "sources": [],
        "questions": [],
        "component": "company_qna"
    },
    "reportSource": "WKLAPP"
}),
    });
    setIsLoading(false);
    router.replace('/')
    return reports.json();
  };
  return (
    <ThemedView style={styles.container}>
      {glob.mode === "cp" ? (
        <>
          <ThemedText style={styles.h1}>Company Primer</ThemedText>
          <ThemedView
            style={{
              width: "100%",
              paddingLeft: 15,
              paddingRight: 15,
              maxWidth: 500,
            }}
          >
            <ThemedText style={styles.h4}>Company</ThemedText>
            <TextInput
              value={companySearch}
              onChangeText={(e) => setCompanySearch(e)}
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
            {searchLoading && (
              <ThemedView style={{ marginTop: 12 }}>
                <ActivityIndicator color="#ffffff" />
              </ThemedView>
            )}
            {searchResults.length !== 0 && (
              <ThemedView
                style={{ overflowY: "auto", maxHeight: 200, marginTop: 15 }}
              >
                {searchResults.map((result) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setPermalink(result.permalink);
                        setSearchResults([]);
                      }}
                      key={result}
                    >
                      <ThemedView
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 12,
                        }}
                      >
                        <ThemedView
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Image
                            source={{
                              uri: `https://wklogo.blob.core.windows.net/logos-small/${result.permalink}.png`,
                            }}
                            style={{ width: 50, height: 50, borderRadius: 12 }}
                          />
                          <ThemedText
                            style={{ marginLeft: 12, fontWeight: 500 }}
                          >
                            {result.name}
                          </ThemedText>
                        </ThemedView>
                      </ThemedView>
                    </TouchableOpacity>
                  );
                })}
              </ThemedView>
            )}
            {permalink && (
              <ThemedView style={{ marginTop: 12 }}>
                {companyDetailsLoading && <ActivityIndicator color="#ffffff" />}
                <ThemedView
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <ThemedView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#FFF",
                  }}
                  >
                  <Image
                    source={{
                      uri: `https://wklogo.blob.core.windows.net/logos-small/${companyDetails.permalink}.png`,
                    }}
                    style={{ width: 50, height: 50, borderRadius: 12 }}
                  />
                  <ThemedText
                    style={{
                      color: "black",
                      marginLeft: 12,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {companyDetails.org_name}
                  </ThemedText>
                  </ThemedView>
                  <ThemedText style={{
                      color: "black",
                      marginTop: 12,
                      fontSize: 12,
                      fontWeight: 500,
                    }}>{companyDetails.short_description}</ThemedText>
                     <ThemedText style={{
                      color: "black",
                      textDecorationLine:'underline',
                      marginTop: 14,
                      fontSize: 12,
                      fontWeight: 500,
                    }}>{companyDetails.website}</ThemedText>
                </ThemedView>
              </ThemedView>
            )}
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
                handleCPReportGen()
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
                handleIPReportGen();
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
