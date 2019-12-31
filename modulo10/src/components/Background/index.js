import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

export default function Background() {
  return (
    <LinearGradient
      colors={['#7159c1', '#ab59c1']}
      style={{
        flex: 1,
      }}
    />
  );
}
