let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('causes').add(data)
    },
    getAll() {
        return db.collection('causes').get()
    },
    get(id) {
        return db.collection('causes').doc(id).get()
    },
    close(id) {
        return db.collection('causes').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('causes').doc(id).update(data)
    }
};