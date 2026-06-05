import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./productstyles";

const API_BASE = "http://127.0.0.1:5000/api";
const PRODUCT_ENDPOINT = `${API_BASE}/products`;

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

const mapApiProduct = (item: any): Product => ({
  id:
    item.id?.toString() ||
    item.productId?.toString() ||
    item._id?.toString() ||
    `${item.name ?? "product"}-${Math.random().toString(36).slice(2)}`,
  name:
    item.name ||
    item.product_name ||
    item.productName ||
    item.title ||
    "Unknown product",
  molecule:
    item.molecule ||
    item.activeIngredient ||
    item.active_ingredient ||
    item.molecule_name ||
    "Unknown molecule",
  company:
    item.company ||
    item.manufacturer ||
    item.brand ||
    item.maker ||
    "Unknown company",
  stock: Number(
    item.stock ?? item.inventory ?? item.quantity ?? item.available ?? 0,
  ),
  price: Number(
    item.price ?? item.unitPrice ?? item.pts_price ?? item.price_point ?? 0,
  ),
  category: item.category || item.productCategory || item.type || "General",
  isNewPromotion: Boolean(
    item.isNewPromotion ?? item.newPromotion ?? item.promotion ?? false,
  ),
});

export default function ProductScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [productInventory, setProductInventory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(PRODUCT_ENDPOINT)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Failed to load products: ${res.status} ${res.statusText} ${text}`,
          );
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Product API returned unexpected payload.");
        }
        setProductInventory(data.map(mapApiProduct));
      })
      .catch((err) => {
        console.error("Product fetch error", err);
        setError(
          err instanceof Error ? err.message : "Failed to load products.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // --- Dynamic Search & Filter Logic ---
  const companies = useMemo(() => {
    const unique = Array.from(
      new Set(
        productInventory.map((item) => item.company || "Unknown company"),
      ),
    );
    return ["All Companies", ...unique];
  }, [productInventory]);

  const filteredProducts = useMemo(() => {
    return productInventory.filter((product) => {
      const matchesCompany =
        selectedCompany === "All Companies" ||
        product.company === selectedCompany;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.molecule.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCompany && matchesSearch;
    });
  }, [productInventory, searchQuery, selectedCompany]);

  const promotionalItems = useMemo(
    () => productInventory.filter((item) => item.isNewPromotion),
    [productInventory],
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

        {/* 2a. LOADING / ERROR STATE */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* 3. HORIZONTAL COMPANY FILTER SELECTOR */}
        <View style={styles.companyStickyBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChipWrapper}
          >
            {companies.map((company) => {
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
