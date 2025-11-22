import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants';

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  containerStyle?: object;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '>',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.itemContainer}>
            {item.onPress && !isLast ? (
              <TouchableOpacity
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Text style={styles.linkText}>{item.label}</Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={[
                  styles.text,
                  isLast && styles.activeText,
                ]}
              >
                {item.label}
              </Text>
            )}

            {!isLast && (
              <Text style={styles.separator}>{separator}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.caption,
    color: colors.text.inverse,
    opacity: 0.7,
  },
  linkText: {
    ...typography.caption,
    color: colors.primary.DEFAULT,
    fontWeight: '600',
  },
  activeText: {
    color: colors.text.inverse,
    fontWeight: '600',
    opacity: 1,
  },
  separator: {
    ...typography.caption,
    color: colors.text.inverse,
    opacity: 0.5,
    marginHorizontal: 8,
  },
});
