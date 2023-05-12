import cloneDeep from 'lodash/cloneDeep';
import { YumTypeBase } from '../types';

export default function clone<Yum extends YumTypeBase>(yum: Yum): Yum {
  return cloneDeep(yum);
}
