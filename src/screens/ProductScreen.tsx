import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./productstyles";

// --- Comprehensive Mock Database ---
const COMPANIES = ["All Companies", "Cipla Ltd", "Sun Pharma", "Mankind"];
type Product = {
  id: string;
  name: string;
  molecule: string;
  company: string;
  stock: number;
  price: number;
  category: string;
  isNewPromotion: boolean;
};
// Product inventory will be stored in component state now (see below)

export default function ProductScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [productInventory, setProductInventory] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProductInventory(data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  // --- Dynamic Search & Filter Logic ---
  const filteredProducts = productInventory.filter((product) => {
    const matchesCompany =
      selectedCompany === "All Companies" ||
      product.company === selectedCompany;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.molecule.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCompany && matchesSearch;
  });

  // --- Promoted/New Products Filter (For Top Carousel Section) ---
  const promotionalItems = productInventory.filter(
    (item) => item.isNewPromotion,
  );

  // --- Individual Inventory Item Render Block ---
  const renderInventoryItem = ({ item }: { item: Product }) => {
    const isLowStock = item.stock < 200;

    return (
      <View style={styles.productCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.moleculeText}>{item.molecule}</Text>
          </View>
          {item.isNewPromotion && (
            <View style={styles.promoBadge}>
              <FontAwesome5
                name="bullhorn"
                size={10}
                color="#ffffff"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.promoBadgeText}>PROMOTE</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.metaGroup}>
            <Text style={styles.metaLabel}>Company</Text>
            <Text style={styles.metaValue}>{item.company}</Text>
          </View>

          <View style={styles.metaGroup}>
            <Text style={styles.metaLabel}>PTS Price</Text>
            <Text style={styles.metaValue}>₹{item.price.toFixed(2)}</Text>
          </View>

          <View style={[styles.metaGroup, { alignItems: "flex-end" }]}>
            <Text style={styles.metaLabel}>Avail. Stock</Text>
            <Text
              style={[
                styles.metaValue,
                isLowStock ? styles.lowStock : styles.goodStock,
              ]}
            >
              {item.stock} Box
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />

      {/* 1. TOP HEADER & SEARCH SEARCH MATRIX */}
      <View style={styles.searchHeaderContainer}>
        <Text style={styles.screenTitle}>Product Catalog</Text>

        <View style={styles.searchBoxContainer}>
          <FontAwesome5
            name="search"
            size={16}
            color="#94a3b8"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Search Trade Name or Molecule..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* COMPONENT STREAMING LAYER */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 2. PROMOTION SHOWCASE BANNER (Horizontal Slide) */}
        {searchQuery === "" && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Priority Launch Campaigns</Text>
              <Text style={styles.seeAllLink}>Active Today</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promoCarousel}
            >
              {promotionalItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  style={styles.promoBannerCard}
                >
                  <View style={styles.promoIconCircle}>
                    <MaterialCommunityIcons
                      name="material-design"
                      size={24}
                      color="#2563eb"
                    />
                  </View>
                  <Text style={styles.promoItemName}>{item.name}</Text>
                  <Text style={styles.promoItemMolecule}>{item.molecule}</Text>
                  <View style={styles.companyPillText}>
                    <Text style={styles.companyPillLabel}>{item.company}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 3. HORIZONTAL COMPANY FILTER SELECTOR */}
        <View style={styles.companyStickyBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChipWrapper}
          >
            {COMPANIES.map((company) => {
              const isActive = selectedCompany === company;
              return (
                <TouchableOpacity
                  key={company}
                  onPress={() => setSelectedCompany(company)}
                  style={[
                    styles.chipButton,
                    isActive ? styles.activeChip : styles.inactiveChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isActive
                        ? styles.activeChipText
                        : styles.inactiveChipText,
                    ]}
                  >
                    {company}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 4. HIGH PERFORMANCE RENDER ENGINE LIST */}
        <View style={styles.listSection}>
          <Text style={styles.catalogCountCount}>
            Showing {filteredProducts.length} Stock-keeping Products
          </Text>

          <FlatList
            data={filteredProducts}
            renderItem={renderInventoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // Nested safely inside unified ScrollView
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <FontAwesome5 name="box-open" size={40} color="#cbd5e1" />
                <Text style={styles.emptyStateText}>
                  No products match your layout query.
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
