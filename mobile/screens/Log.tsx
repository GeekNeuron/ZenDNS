import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/logs/recent')
      .then(res => res.json())
      .then(setLogs)
      .catch(() => setLogs([]));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent DNS Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.timestamp} → {item.domain}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { paddingVertical: 4, fontSize: 14, color: '#333' }
});
