import {DomainBuilder} from '@s-ui/studio-utils'
import Domain from 'mgb-skylab-movies'

export default {
  default: {
    domain: DomainBuilder.extend({domain: new Domain()}).build()
  }
}
