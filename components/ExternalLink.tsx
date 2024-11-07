import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';  // Correct the import statement
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  // Use TouchableOpacity to handle the press event for better cross-platform behavior
  return (
    <TouchableOpacity
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native
          event.preventDefault();
          // Open the link in an in-app browser on native platforms
          await openBrowserAsync(href);
        }
      }}
    >
      <Link {...rest} href={href} />
    </TouchableOpacity>
  );
}
