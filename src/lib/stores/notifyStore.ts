import { writable } from 'svelte/store';

type NotificationType = 'success' | 'error' | 'warning';

class Notification {
	constructor(public id: string, public message: string, public type: NotificationType) {}

	get color() {
		switch (this.type) {
			case 'success':
				return 'green';
			case 'error':
				return 'red';
			case 'warning':
				return 'yellow';
			default:
				return 'green';
		}
	}
}

const PERSITANCE_TIME = 5000; // milliseconds to persist notification -> then delete
const MAX_NOTIFICATIONS = 5; // max number of notifications to show

function createNotifyStore() {
	const { subscribe, set, update } = writable<Notification[]>([]);

	return {
		subscribe,
		add: (message: string, type: NotificationType = 'success') => {
			const id = Math.random().toString(36).slice(2, 9);
			console.log('id', id);

			// Add new notification to store | if there are more than 5 notifications, delete the oldest one
			update((notifications) => {
				if (notifications.length >= MAX_NOTIFICATIONS) {
					notifications.shift();
				}

				return [...notifications, new Notification(id, message, type)];
			});

			setTimeout(() => {
				notificationStore.delete(id);
			}, PERSITANCE_TIME);
		},
		delete: (id: string) =>
			update((notifications) => notifications.filter((notification) => notification.id !== id)),
		reset: () => set([])
	};
}

const notificationStore = createNotifyStore();

export default notificationStore;
