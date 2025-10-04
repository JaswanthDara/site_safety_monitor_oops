class NotificationService {
  update(hazardData) {
    // Sending a notification
    console.log(`[NOTIFICATION] New hazard reported!`);
    console.log(`- Title: ${hazardData.title}`);
    console.log(`- Severity: ${hazardData.severity}`);
    console.log(`- Status: ${hazardData.status}`);
    console.log(`- Reported By: ${hazardData.reportedBy}`);
  }
}

module.exports = NotificationService;
