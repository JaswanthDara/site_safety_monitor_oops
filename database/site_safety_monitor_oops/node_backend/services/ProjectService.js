export default class NotificationService {
  constructor({ notificationModel, userModel }) {
    this.notificationModel = notificationModel;
    this.userModel = userModel;
  }

  async createNotification(payload) {
    const notification = new this.notificationModel({
      ...payload,
      createdAt: new Date(),
      read: false,
    });
    return notification.save();
  }

  async markAsRead(notificationId) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }

  async getUserNotifications(userId) {
    return this.notificationModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
  }

  async dispatchForIncident(incident) {
    const admins = await this.userModel.find({ role: "admin" }).lean();
    const notifications = admins.map(
      (a) =>
        new this.notificationModel({
          user: a._id,
          message: `New incident reported: ${incident.title || "Untitled Incident"}`,
          type: "incident",
          createdAt: new Date(),
          read: false,
        })
    );
    return this.notificationModel.insertMany(notifications);
  }
}
