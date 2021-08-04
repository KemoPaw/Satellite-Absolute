export enum SearchCommandType {
  User = 'user',
  Has = 'has',
  Date = 'date',
  Channel = 'channel',
}

export enum SearchCommand {
  Empty = '',
  From = 'from',
  Mentions = 'mentions',
  Has = 'has',
  Before = 'before',
  During = 'during',
  After = 'after',
  In = 'in',
}

export enum SearchValueHas {
  Link = 'link',
  Embed = 'embed',
  File = 'file',
  Video = 'video',
  Image = 'image',
  Sound = 'sound',
}

export type SearchQueryItem = {
  command: SearchCommand
  value: string
  index: number
  cursorStart: number
  cursorEnd: number
}

export type SearchUser = {
  name: string
  value: string
  address: string
  avatar?: string
}

export type SearchChannel = {
  name: string
  value: string
  address: string
}

export type SearchOption = {
  name?: string
  address?: string
  avatar?: string
  key: string
  value: string
}

export type SearchRecommend = {
  [key: string]: SearchOption[]
}

export type SearchRecommendResultItem = {
  command: SearchCommand
  value: SearchUser | SearchChannel | SearchOption
}

export type CalendarDateType = {
  id: string
}

export type SearchCommandTypeParam = {
  key: string
  values?: any[]
  options?: any[]
}

export type SearchCommandMeta = {
  name: SearchCommand
  type: SearchCommandType
  description: string
  title: string
}

export const SearchItemList = [
  {
    command: SearchCommand.From,
    value: 'Halley_Themis',
  },
  {
    command: SearchCommand.From,
    value: 'Tarus_Nix',
  },
  {
    command: SearchCommand.From,
    value: 'Lyra_Cassini',
  },
  {
    command: SearchCommand.From,
    value: 'Phoenix_Kalindi',
  },
  {
    command: SearchCommand.From,
    value: 'Ariel_Larissa',
  },
  {
    command: SearchCommand.Mentions,
    value: 'Tarus_Nix',
  },
  {
    command: SearchCommand.Mentions,
    value: 'Lyra_Cassini',
  },
  {
    command: SearchCommand.Mentions,
    value: 'Phoenix_Kalindi',
  },
  {
    command: SearchCommand.Mentions,
    value: 'Ariel_Larissa',
  },
  {
    command: SearchCommand.In,
    value: 'Satellite',
  },
  {
    command: SearchCommand.In,
    value: 'Solstice',
  },
]
