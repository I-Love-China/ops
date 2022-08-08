// 20220808091907926
exports.getReadableTimestamp = () => new Date().toISOString().replace(/[^\d]/g, '');