class GearLog {
  constructor(equipmentId, userId, action, notes = '') {
    this.equipmentId = equipmentId;        
    this.userId = userId;                 
    this.action = action;                  
    this.notes = notes;                    
    this.timestamp = new Date();           
  }

  // Encapsulation
  getLogEntry() {
    return {
      equipment: this.equipmentId,
      user: this.userId,
      action: this.action,
      notes: this.notes,
      timestamp: this.timestamp
    };
  }

  // Static method to validate actions
  static isValidAction(action) {
    const validActions = ['checked_in', 'checked_out', 'maintenance', 'repair', 'inspection'];
    return validActions.includes(action);
  }

  // Abstraction
  toString() {
    return `User ${this.userId} performed '${this.action}' on equipment ${this.equipmentId} at ${this.timestamp.toLocaleString()}`;
  }
}

module.exports = GearLog;
