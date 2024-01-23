import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./src/firebase"

const updateKeywords = async () => {
    try {
        const documents = await getDocs(collection(db, 'sample'));
        documents.forEach(async (docSnapshot) => {
            const { address, name, types } = docSnapshot.data();

            const addressArray = address.split(/,|\s/).filter((item: string) => item.trim() !== '');
            const nameArray = name.split(" ").map((item: string) => item.trim());
            const typesArray = types.split(",").map((item: string) => item.trim());

            const keywords = Array.from(new Set([...addressArray, ...nameArray, ...typesArray]));

            await setDoc(doc(db, 'sample', docSnapshot.id), { keywords }, { merge: true });
        });
    } catch (e) {
        console.error(e);
    }
};

updateKeywords().then(() => process.exit());