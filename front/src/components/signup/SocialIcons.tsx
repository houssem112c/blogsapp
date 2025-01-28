// SocialIcons.tsx
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SocialIcons = () => {
  return (
    <View style={styles.socialIcons}>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733609.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});

export default SocialIcons;
