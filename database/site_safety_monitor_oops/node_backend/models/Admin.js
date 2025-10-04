const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  permissions: {
    type: [String],
    default: ['manage_users', 'view_reports', 'manage_projects'],
  },
}, { timestamps: true });


AdminSchema.methods.getAdminProfile = function () {
  return {
    userId: this.user,
    permissions: this.permissions,
  };
};

module.exports = mongoose.model('Admin', AdminSchema);
