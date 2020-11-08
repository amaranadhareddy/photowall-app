import webpush from "web-push";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
const ServiceWorkerRegister = () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  const vapidKeys = webpush.generateVAPIDKeys();
  navigator.serviceWorker.register(swUrl).then((response) => {
    return response.pushManager.getSubscription().then(function (subscription) {
      const vapidPublicKey = vapidKeys.publicKey;
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
    });
  });
};
export default ServiceWorkerRegister;
