let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('ideas').add(data)
    },
    getAll() {
        return db.collection('ideas').get()
    },
    get(id) {
        return db.collection('ideas').doc(id).get()
    },
    close(id) {
        return db.collection('ideas').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('ideas').doc(id).update(data)
    },
    update(id, data) {
        return db.collection('ideas').doc(id).update(data)
    }
};