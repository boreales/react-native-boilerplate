import React, {useState} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, TextInput, ScrollView, Image, SafeAreaView, SectionList, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/evil-icons';

const items = [
  { id: '1', title: 'Item 1', image: 'https://as2.ftcdn.net/v2/jpg/04/30/46/87/1000_F_430468753_hjeCITV6815pAztrEiOyElhwCao4v6XS.jpg' },
  { id: '2', title: 'Item 2', image: 'https://t3.ftcdn.net/jpg/09/63/80/76/240_F_963807674_6wMpeHZYSjCdDSQ19c607lW1Bx2dRRmB.jpg' },
  { id: '3', title: 'Item 3', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '4', title: 'Item 4', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '5', title: 'Item 5', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '6', title: 'Item 6', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '7', title: 'Item 7', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '8', title: 'Item 8', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '9', title: 'Item 9', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' },
  { id: '10', title: 'Item 10', image: 'https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg' }
];

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: { title: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const renderItem = ({ item }: { item: { id: string; title: string; image: string } }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { title: item.title })}>
      <ImageBackground source={{ uri: item.image }} style={styles.item}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} style={styles.container} />;
};

import { RouteProp } from '@react-navigation/native';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route }: { route: DetailsScreenRouteProp }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>{route.params?.title ?? 'Détail'}</Text>
  </View>
);

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const images = Array.from({ length: 21 }, (_, i) => `https://t4.ftcdn.net/jpg/09/25/92/25/240_F_925922507_W8pz4XKdByJ1Ditv3lLuh3cETV65Pdok.jpg`);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher..."
        value={query}
        onChangeText={setQuery}
      />
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.gridItem} />
        ))}
      </ScrollView>
    </View>
  );
};


const UserScreen = () => {
  const sections = [
    { title: 'Compte', data: ['Profil', 'Paramètres'] },
    { title: 'Autres', data: ['Support', 'Déconnexion'] },
  ];

  return (
    <View style={styles.userContainer}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww' }} style={styles.avatar} />
        <Text style={styles.username}>Utilisateur</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sectionItem}>
            <Text style={styles.sectionText}>{item}</Text>
            <FontAwesome6 name="chevron-right" size={20} />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
      <Button title="Se connecter" onPress={() => navigation.replace('MainApp')} />
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Accueil" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const MainApp = () => (
  <Tab.Navigator screenOptions={({ route }: { route: { name: string } }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'location';
      } else if (route.name === 'Recherche') {
        iconName = 'search';
      } else {
        iconName = 'user';
      }

      // You can return any component that you like here!
      return <FontAwesome6 name={iconName} size={26} />;
    },
    })}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Recherche" component={SearchScreen} />
    <Tab.Screen name="Utilisateur" component={UserScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  itemTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 5 },
  detailsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  detailsTitle: { fontSize: 24, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flex: 1, padding: 10 },
  searchBar: { height: 40, borderRadius: 20, backgroundColor: '#eee', paddingHorizontal: 15, marginBottom: 10 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '30%', height: 100, marginBottom: 10 },
  userContainer: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#f8f8f8' },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  username: { fontSize: 18, fontWeight: 'bold' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: 10 },
  sectionItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  sectionText: { fontSize: 14 },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  button: { marginTop: 10 },
});
export default App;
