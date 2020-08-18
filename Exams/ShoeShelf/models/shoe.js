let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('shoes').add(data)
    },
    getAll() {
        return db.collection('shoes').get()
    },
    get(id) {
        return db.collection('shoes').doc(id).get()
    },
    close(id) {
        return db.collection('shoes').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('shoes').doc(id).update(data)
    },
    update(id, data) {
        return db.collection('shoes').doc(id).update(data)
    }
};