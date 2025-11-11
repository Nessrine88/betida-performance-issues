import { client } from "../sanity";

export type NotificationData = {
  _id: string;
  title: string;
  description?: string;
  time: string;
  icon?: string;
};

export const fetchNotifications = async (): Promise<NotificationData[]> => {
  return client.fetch(`*[_type == "notification"] | order(time desc){
    _id,
    title,
    description,
    time,
    "icon": icon.asset->url
  }`);
};
