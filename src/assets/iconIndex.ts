/**
 * Iconly Icon Index
 * Auto-generated from Figma extraction
 * 1,900+ icons across multiple styles
 */

// Icon styles available
export type IconStyle =
  | 'regular-bold'
  | 'regular-bulk'
  | 'regular-light'
  | 'regular-outline'
  | 'regular-broken'
  | 'regular-two-tone'
  | 'sharp-bold'
  | 'sharp-bulk'
  | 'sharp-light'
  | 'sharp-outline'
  | 'sharp-broken'
  | 'sharp-two-tone'
  | 'curved-bold'
  | 'curved-bulk'
  | 'curved-light'
  | 'curved-outline'
  | 'curved-broken'
  | 'curved-two-tone';

// Common icon names
export type IconName =
  | 'home'
  | 'profile'
  | 'setting'
  | 'notification'
  | 'search'
  | 'heart'
  | 'star'
  | 'bookmark'
  | 'calendar'
  | 'chart'
  | 'activity'
  | 'camera'
  | 'image'
  | 'video'
  | 'voice'
  | 'message'
  | 'chat'
  | 'call'
  | 'calling'
  | 'call-missed'
  | 'call-silent'
  | 'location'
  | 'discovery'
  | 'document'
  | 'folder'
  | 'wallet'
  | 'buy'
  | 'bag'
  | 'ticket'
  | 'ticket-star'
  | 'discount'
  | 'category'
  | 'graph'
  | 'scan'
  | 'play'
  | 'game'
  | 'plus'
  | 'edit'
  | 'edit-square'
  | 'delete'
  | 'show'
  | 'hide'
  | 'filter'
  | 'lock'
  | 'unlock'
  | 'shield-done'
  | 'shield-fail'
  | 'danger'
  | 'info-circle'
  | 'info-square'
  | 'tick-square'
  | 'close-square'
  | 'more-circle'
  | 'more-square'
  | 'work'
  | 'swap'
  | 'password'
  | 'send'
  | 'paper'
  | 'paper-plus'
  | 'paper-negative'
  | 'paper-fail'
  | 'paper-download'
  | 'paper-upload'
  | 'upload'
  | 'download'
  | 'login'
  | 'logout'
  | 'add-user'
  | '2-user'
  | '3-user'
  | 'volume-up'
  | 'volume-down'
  | 'volume-off'
  | 'time-circle'
  | 'time-square'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up-2'
  | 'arrow-down-2'
  | 'arrow-left-2'
  | 'arrow-right-2'
  | 'arrow-up-3'
  | 'arrow-down-3'
  | 'arrow-left-3'
  | 'arrow-right-3'
  | 'arrow-up-circle'
  | 'arrow-down-circle'
  | 'arrow-left-circle'
  | 'arrow-right-circle'
  | 'arrow-up-square'
  | 'arrow-down-square'
  | 'arrow-left-square'
  | 'arrow-right-square';

// Base path for icons
const ICON_BASE_PATH = '../figma-extracted/assets/components/icons';

/**
 * Get icon by name and style
 * @param name Icon name (e.g., 'home', 'profile', 'setting')
 * @param style Icon style (default: 'regular-bold')
 * @returns require() path to the icon
 */
export const getIcon = (name: IconName, style: IconStyle = 'regular-bold') => {
  const icons: Record<string, Record<string, any>> = {
    // Home icons
    'home': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-home.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-home.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-home.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-home.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-home.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-home.png'),
      'sharp-bold': require('../figma-extracted/assets/components/icons/iconly-sharp-bold-home.png'),
      'sharp-bulk': require('../figma-extracted/assets/components/icons/iconly-sharp-bulk-home.png'),
      'sharp-light': require('../figma-extracted/assets/components/icons/iconly-sharp-light-home.png'),
      'sharp-outline': require('../figma-extracted/assets/components/icons/iconly-sharp-outline-home.png'),
      'sharp-broken': require('../figma-extracted/assets/components/icons/iconly-sharp-broken-home.png'),
      'sharp-two-tone': require('../figma-extracted/assets/components/icons/iconly-sharp-two-tone-home.png'),
      'curved-bold': require('../figma-extracted/assets/components/icons/iconly-curved-bold-home.png'),
      'curved-bulk': require('../figma-extracted/assets/components/icons/iconly-curved-bulk-home.png'),
      'curved-light': require('../figma-extracted/assets/components/icons/iconly-curved-light-home.png'),
      'curved-outline': require('../figma-extracted/assets/components/icons/iconly-curved-outline-home.png'),
      'curved-broken': require('../figma-extracted/assets/components/icons/iconly-curved-broken-home.png'),
      'curved-two-tone': require('../figma-extracted/assets/components/icons/iconly-curved-two-tone-home.png'),
    },
    // Profile icons
    'profile': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-profile.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-profile.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-profile.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-profile.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-profile.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-profile.png'),
    },
    // Settings icons
    'setting': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-setting.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-setting.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-setting.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-setting.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-setting.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-setting.png'),
    },
    // Notification icons
    'notification': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-notification.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-notification.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-notification.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-notification.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-notification.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-notification.png'),
    },
    // Search icons
    'search': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-search.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-search.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-search.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-search.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-search.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-search.png'),
    },
    // Heart icons
    'heart': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-heart.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-heart.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-heart.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-heart.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-heart.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-heart.png'),
    },
    // Calendar icons
    'calendar': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-calendar.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-calendar.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-calendar.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-calendar.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-calendar.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-calendar.png'),
    },
    // Activity icons
    'activity': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-activity.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-activity.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-activity.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-activity.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-activity.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-activity.png'),
    },
    // Play icons
    'play': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-play.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-play.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-play.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-play.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-play.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-play.png'),
    },
    // Star icons
    'star': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-star.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-star.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-star.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-star.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-star.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-star.png'),
    },
    // Chat icons
    'chat': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-chat.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-chat.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-chat.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-chat.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-chat.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-chat.png'),
    },
    // Message icons
    'message': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-message.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-message.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-message.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-message.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-message.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-message.png'),
    },
    // Document icons
    'document': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-document.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-document.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-document.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-document.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-document.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-document.png'),
    },
    // Edit icons
    'edit': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-edit.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-edit.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-edit.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-edit.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-edit.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-edit.png'),
    },
    // Delete icons
    'delete': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-delete.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-delete.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-delete.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-delete.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-delete.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-delete.png'),
    },
    // Arrow icons
    'arrow-left': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-left.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-arrow-left.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-arrow-left.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-arrow-left.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-arrow-left.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-arrow-left.png'),
    },
    'arrow-right': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-right.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-arrow-right.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-arrow-right.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-arrow-right.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-arrow-right.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-arrow-right.png'),
    },
    'arrow-up': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-up.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-arrow-up.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-arrow-up.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-arrow-up.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-arrow-up.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-arrow-up.png'),
    },
    'arrow-down': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-arrow-down.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-arrow-down.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-arrow-down.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-arrow-down.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-arrow-down.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-arrow-down.png'),
    },
    // Plus icon
    'plus': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-plus.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-plus.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-plus.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-plus.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-plus.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-plus.png'),
    },
    // Lock icons
    'lock': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-lock.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-lock.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-lock.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-lock.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-lock.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-lock.png'),
    },
    'unlock': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-unlock.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-unlock.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-unlock.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-unlock.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-unlock.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-unlock.png'),
    },
    // Show/Hide icons
    'show': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-show.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-show.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-show.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-show.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-show.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-show.png'),
    },
    'hide': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-hide.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-hide.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-hide.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-hide.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-hide.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-hide.png'),
    },
    // Voice icons
    'voice': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-voice.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-voice.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-voice.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-voice.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-voice.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-voice.png'),
    },
    // Camera icons
    'camera': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-camera.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-camera.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-camera.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-camera.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-camera.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-camera.png'),
    },
    // Video icons
    'video': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-video.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-video.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-video.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-video.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-video.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-video.png'),
    },
    // Location icons
    'location': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-location.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-location.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-location.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-location.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-location.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-location.png'),
    },
    // Send icons
    'send': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-send.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-send.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-send.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-send.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-send.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-send.png'),
    },
    // Bookmark icons
    'bookmark': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-bookmark.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-bookmark.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-bookmark.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-bookmark.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-bookmark.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-bookmark.png'),
    },
    // Wallet icons
    'wallet': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-wallet.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-wallet.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-wallet.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-wallet.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-wallet.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-wallet.png'),
    },
    // Folder icons
    'folder': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-folder.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-folder.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-folder.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-folder.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-folder.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-folder.png'),
    },
    // Work icons
    'work': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-work.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-work.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-work.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-work.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-work.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-work.png'),
    },
    // Category icons
    'category': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-category.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-category.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-category.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-category.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-category.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-category.png'),
    },
    // Graph icons
    'graph': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-graph.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-graph.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-graph.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-graph.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-graph.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-graph.png'),
    },
    // Chart icons
    'chart': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-chart.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-chart.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-chart.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-chart.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-chart.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-chart.png'),
    },
    // Scan icons
    'scan': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-scan.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-scan.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-scan.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-scan.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-scan.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-scan.png'),
    },
    // Game icons
    'game': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-game.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-game.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-game.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-game.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-game.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-game.png'),
    },
    // Buy/Bag icons
    'buy': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-buy.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-buy.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-buy.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-buy.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-buy.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-buy.png'),
    },
    'bag': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-bag.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-bag.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-bag.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-bag.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-bag.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-bag.png'),
    },
    // Discount icons
    'discount': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-discount.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-discount.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-discount.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-discount.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-discount.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-discount.png'),
    },
    // Ticket icons
    'ticket': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-ticket.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-ticket.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-ticket.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-ticket.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-ticket.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-ticket.png'),
    },
    // Discovery icons
    'discovery': {
      'regular-bold': require('../figma-extracted/assets/components/icons/iconly-regular-bold-discovery.png'),
      'regular-bulk': require('../figma-extracted/assets/components/icons/iconly-regular-bulk-discovery.png'),
      'regular-light': require('../figma-extracted/assets/components/icons/iconly-regular-light-discovery.png'),
      'regular-outline': require('../figma-extracted/assets/components/icons/iconly-regular-outline-discovery.png'),
      'regular-broken': require('../figma-extracted/assets/components/icons/iconly-regular-broken-discovery.png'),
      'regular-two-tone': require('../figma-extracted/assets/components/icons/iconly-regular-two-tone-discovery.png'),
    },
  };

  return icons[name]?.[style] || icons[name]?.['regular-bold'];
};

// Common icon shortcuts for easy access
export const Icons = {
  // Navigation
  home: getIcon('home'),
  homeBold: getIcon('home', 'regular-bold'),
  homeOutline: getIcon('home', 'regular-outline'),

  profile: getIcon('profile'),
  profileBold: getIcon('profile', 'regular-bold'),
  profileOutline: getIcon('profile', 'regular-outline'),

  setting: getIcon('setting'),
  settingBold: getIcon('setting', 'regular-bold'),
  settingOutline: getIcon('setting', 'regular-outline'),

  notification: getIcon('notification'),
  notificationBold: getIcon('notification', 'regular-bold'),
  notificationOutline: getIcon('notification', 'regular-outline'),

  search: getIcon('search'),
  searchBold: getIcon('search', 'regular-bold'),
  searchOutline: getIcon('search', 'regular-outline'),

  // Actions
  heart: getIcon('heart'),
  heartBold: getIcon('heart', 'regular-bold'),
  heartOutline: getIcon('heart', 'regular-outline'),

  star: getIcon('star'),
  starBold: getIcon('star', 'regular-bold'),
  starOutline: getIcon('star', 'regular-outline'),

  bookmark: getIcon('bookmark'),
  bookmarkBold: getIcon('bookmark', 'regular-bold'),
  bookmarkOutline: getIcon('bookmark', 'regular-outline'),

  edit: getIcon('edit'),
  editBold: getIcon('edit', 'regular-bold'),
  editOutline: getIcon('edit', 'regular-outline'),

  delete: getIcon('delete'),
  deleteBold: getIcon('delete', 'regular-bold'),
  deleteOutline: getIcon('delete', 'regular-outline'),

  plus: getIcon('plus'),
  plusBold: getIcon('plus', 'regular-bold'),
  plusOutline: getIcon('plus', 'regular-outline'),

  // Communication
  chat: getIcon('chat'),
  chatBold: getIcon('chat', 'regular-bold'),
  chatOutline: getIcon('chat', 'regular-outline'),

  message: getIcon('message'),
  messageBold: getIcon('message', 'regular-bold'),
  messageOutline: getIcon('message', 'regular-outline'),

  send: getIcon('send'),
  sendBold: getIcon('send', 'regular-bold'),
  sendOutline: getIcon('send', 'regular-outline'),

  // Media
  play: getIcon('play'),
  playBold: getIcon('play', 'regular-bold'),
  playOutline: getIcon('play', 'regular-outline'),

  camera: getIcon('camera'),
  cameraBold: getIcon('camera', 'regular-bold'),
  cameraOutline: getIcon('camera', 'regular-outline'),

  video: getIcon('video'),
  videoBold: getIcon('video', 'regular-bold'),
  videoOutline: getIcon('video', 'regular-outline'),

  voice: getIcon('voice'),
  voiceBold: getIcon('voice', 'regular-bold'),
  voiceOutline: getIcon('voice', 'regular-outline'),

  // Arrows
  arrowLeft: getIcon('arrow-left'),
  arrowRight: getIcon('arrow-right'),
  arrowUp: getIcon('arrow-up'),
  arrowDown: getIcon('arrow-down'),

  // Data/Charts
  activity: getIcon('activity'),
  activityBold: getIcon('activity', 'regular-bold'),
  activityOutline: getIcon('activity', 'regular-outline'),

  chart: getIcon('chart'),
  chartBold: getIcon('chart', 'regular-bold'),
  chartOutline: getIcon('chart', 'regular-outline'),

  graph: getIcon('graph'),
  graphBold: getIcon('graph', 'regular-bold'),
  graphOutline: getIcon('graph', 'regular-outline'),

  // Calendar/Time
  calendar: getIcon('calendar'),
  calendarBold: getIcon('calendar', 'regular-bold'),
  calendarOutline: getIcon('calendar', 'regular-outline'),

  // Security
  lock: getIcon('lock'),
  lockBold: getIcon('lock', 'regular-bold'),
  lockOutline: getIcon('lock', 'regular-outline'),

  unlock: getIcon('unlock'),
  unlockBold: getIcon('unlock', 'regular-bold'),
  unlockOutline: getIcon('unlock', 'regular-outline'),

  show: getIcon('show'),
  showBold: getIcon('show', 'regular-bold'),
  showOutline: getIcon('show', 'regular-outline'),

  hide: getIcon('hide'),
  hideBold: getIcon('hide', 'regular-bold'),
  hideOutline: getIcon('hide', 'regular-outline'),

  // Documents
  document: getIcon('document'),
  documentBold: getIcon('document', 'regular-bold'),
  documentOutline: getIcon('document', 'regular-outline'),

  folder: getIcon('folder'),
  folderBold: getIcon('folder', 'regular-bold'),
  folderOutline: getIcon('folder', 'regular-outline'),

  // Location
  location: getIcon('location'),
  locationBold: getIcon('location', 'regular-bold'),
  locationOutline: getIcon('location', 'regular-outline'),

  discovery: getIcon('discovery'),
  discoveryBold: getIcon('discovery', 'regular-bold'),
  discoveryOutline: getIcon('discovery', 'regular-outline'),
};

export default Icons;
