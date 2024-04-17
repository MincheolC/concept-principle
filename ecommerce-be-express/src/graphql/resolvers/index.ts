import { userResolvers } from "./user";
import _ from "lodash";

export const resolvers = _.merge(userResolvers);
