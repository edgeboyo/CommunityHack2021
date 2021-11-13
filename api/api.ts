import { app } from "../app";
import { Datastore } from "@google-cloud/datastore";

export async function apiDebug(req: any, res: any) {
  // Creates a client
  const datastore = new Datastore();

  async function quickstart() {
    // The kind for the new entity
    const kind = "Task";

    // The name/ID for the new entity
    const name = "sampletask1";

    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key([kind, name]);

    // Prepares the new entity
    const task = {
      key: taskKey,
      data: {
        description: "Buy milk",
      },
    };

    // Saves the entity
    await datastore.save(task);
    console.log();

    return `Saved ${task.key.name}: ${task.data.description}`;
  }
  const resp = await quickstart();

  return res.status(200).send(resp).end();
}
