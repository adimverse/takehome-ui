import type { NextApiRequest, NextApiResponse } from "next";
import { FormData, FlattenedFormErrors } from "../../types";

type Data = {
  status?: "OK";
  errors?: FlattenedFormErrors;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(400).end();
    return;
  }

  const result = FormData.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten() });
    return;
  }

  res.status(200).json({ status: "OK" });
}
