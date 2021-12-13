export default async (req, res) => {
  try {
    const monster = req.body;
    monster.updated_at = new Date();
    monster.createTime = new Date(monster.createTime);
    console.log(monster);
    await db("monsters").insert(monster).onConflict("id", monster.id).merge();

    res.status(200).json({
      status: "success",
      data: true,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      data: false,
    });
  }
};
