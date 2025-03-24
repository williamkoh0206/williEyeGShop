import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const StarRating = ({ rating }) => {
  // Convert rating to nearest half-star (e.g., 4.3 -> 4.5, 4.1 -> 4.0)
  const roundedRating = Math.round(rating * 2) / 2;
  
  const renderStars = () => {
    const stars = [];
    
    // Create full stars
    for (let i = 1; i <= Math.floor(roundedRating); i++) {
      stars.push(
        <Text key={`full-${i}`} style={styles.star}>★</Text>
      );
    }
    
    // Add half star if needed
    if (roundedRating % 1 !== 0) {
      // Using a visually distinct character for half-star
      stars.push(
        <Text key="half" style={styles.star}>✯</Text>
      );
    }
    
    // Add empty stars
    const emptyStarsCount = 5 - stars.length;
    for (let i = 1; i <= emptyStarsCount; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={[styles.star, styles.emptyStar]}>☆</Text>
      );
    }
    
    return stars;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FFD700', // Gold color for stars
    fontSize: 14,
    marginRight: 1,
  },
  emptyStar: {
    color: '#E0E0E0', // Light gray for empty stars
  },
  ratingText: {
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 4,
  },
});

export default StarRating; 