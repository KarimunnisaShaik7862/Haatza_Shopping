import { NestDurationItem } from '../../types/haatzaNest.types';

export interface NestDurationOption {
  id: string;
  durationLabel: string;
  durationMinutes: number;
  price: number;
  originalPrice: number;
  sequence?: number;
  badge?: string;
  startTime?: string;
  endTime?: string;
}

export const NEST_DURATION_OPTIONS: NestDurationOption[] = [
  { id: 'dur-60', durationLabel: '60 Mins', durationMinutes: 60, price: 79, originalPrice: 199, sequence: 1, badge: '' },
  { id: 'dur-90', durationLabel: '1.5 Hrs', durationMinutes: 90, price: 109, originalPrice: 299, sequence: 2, badge: 'Popular' },
  { id: 'dur-120', durationLabel: '2 Hrs', durationMinutes: 120, price: 169, originalPrice: 399, sequence: 3, badge: '' },
  { id: 'dur-150', durationLabel: '2.5 Hrs', durationMinutes: 150, price: 219, originalPrice: 499, sequence: 4, badge: '' },
  { id: 'dur-180', durationLabel: '3 Hrs', durationMinutes: 180, price: 269, originalPrice: 599, sequence: 5, badge: '' },
  { id: 'dur-210', durationLabel: '3.5 Hrs', durationMinutes: 210, price: 309, originalPrice: 699, sequence: 6, badge: '' },
  { id: 'dur-240', durationLabel: '4 Hrs', durationMinutes: 240, price: 369, originalPrice: 799, sequence: 7, badge: '' },
];

export function mapApiDurationsToNestDurationOptions(apiDurations?: NestDurationItem[]): NestDurationOption[] {
  if (!apiDurations || apiDurations.length === 0) {
    return NEST_DURATION_OPTIONS;
  }
  return [...apiDurations]
    .sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
    .map((item) => {
      const minutes = parseInt(item.duration, 10) || 60;
      return {
        id: `dur-${item.duration}`,
        durationLabel: item.displayTime || `${minutes} Mins`,
        durationMinutes: minutes,
        price: item.price,
        originalPrice: item.originalPrice,
        sequence: item.sequence,
        badge: item.badge || '',
        startTime: item.startTime,
        endTime: item.endTime,
      };
    });
}

export type TimePeriod = 'Morning' | 'Afternoon' | 'Evening';

export const TIME_PERIOD_SLOTS: Record<TimePeriod, string[]> = {
  Morning: [
    '7:00 AM', '7:15 AM', '7:30 AM',
    '7:45 AM', '8:00 AM', '8:15 AM',
    '8:30 AM', '8:45 AM', '9:00 AM',
    '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM',
    '10:45 AM', '11:00 AM', '11:15 AM',
    '11:30 AM', '11:45 AM',
  ],
  Afternoon: [
    '12:00 PM', '12:15 PM', '12:30 PM',
    '12:45 PM', '1:00 PM', '1:15 PM',
    '1:30 PM', '1:45 PM', '2:00 PM',
    '2:15 PM', '2:30 PM', '2:45 PM',
    '3:00 PM', '3:15 PM', '3:30 PM',
    '3:45 PM', '4:00 PM', '4:15 PM',
    '4:30 PM', '4:45 PM',
  ],
  Evening: [
    '5:00 PM', '5:15 PM', '5:30 PM',
    '5:45 PM', '6:00 PM', '6:15 PM',
    '6:30 PM', '6:45 PM', '7:00 PM',
    '7:15 PM', '7:30 PM', '7:45 PM',
    '8:00 PM', '8:15 PM', '8:30 PM',
    '8:45 PM', '9:00 PM',
  ],
};

/**
 * Check if a given time slot string is available.
 * Tomorrow slots are always available.
 * Today slots earlier than current time + 30m buffer are considered past/unavailable.
 */
export const isSlotAvailable = (
  slotStr: string,
  isToday: boolean,
  currentTime: Date = new Date()
): boolean => {
  if (!isToday) return true;

  const [time, modifier] = slotStr.split(' ');
  const parts = time.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const slotDate = new Date(currentTime);
  slotDate.setHours(hours, minutes, 0, 0);

  // 30-minute lead time buffer for on-demand schedule dispatch
  const bufferMs = 30 * 60 * 1000;
  return slotDate.getTime() > (currentTime.getTime() + bufferMs);
};

export function formatBookingDateToBackend(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatBookingTimeToBackend(date: Date = new Date()): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = String(minutes).padStart(2, '0');
  return `${hours}:${minutesStr} ${ampm}`;
}

export interface NestBookingSelection {
  mode: 'instant' | 'schedule';
  selectedDateOption: 'Today' | 'Tomorrow';
  formattedDate: string;
  formattedTime: string;
  apiBookingDate: string;
  apiBookingTime: string;
  duration: NestDurationOption;
  addressLabel: string;
  fullAddress: string;
}

