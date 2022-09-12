class Session {
  constructor(username, expiresAt) {
    this.username = username;
    this.expiresAt = expiresAt;
  }

  isExpired() {
    return this.expiresAt < new Date();
  }
}

const sessions = {};

module.exports = { Session, sessions };
