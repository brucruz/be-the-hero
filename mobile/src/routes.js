import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Primeira navegação criada
const AppStack = createStackNavigator();

// Importar components
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

// Exportar routes
export default function Routes() {
    return(
        // Embrulham as pages
        <NavigationContainer>

            {/* Opção para não aparecer automaticamente o header */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
            
        </NavigationContainer>
    );
}