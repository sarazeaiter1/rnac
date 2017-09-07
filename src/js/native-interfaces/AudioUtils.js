import { Platform } from 'react-native';

import AudioRecorderManager from './AudioRecorderManager';

let AudioUtils;
const {
  MainBundlePath,
  NSCachesDirectoryPath,
  NSDocumentDirectoryPath,
  NSLibraryDirectoryPath,
  CachesDirectoryPath,
  DocumentDirectoryPath,
  LibraryDirectoryPath,
  PicturesDirectoryPath,
  MusicDirectoryPath,
  DownloadsDirectoryPath
} = AudioRecorderManager;
export const getAudioUtils = platform => {
  return platform === 'android'
    ? {
        MainBundlePath: MainBundlePath,
        CachesDirectoryPath: CachesDirectoryPath,
        DocumentDirectoryPath: DocumentDirectoryPath,
        LibraryDirectoryPath: LibraryDirectoryPath,
        PicturesDirectoryPath: PicturesDirectoryPath,
        MusicDirectoryPath: MusicDirectoryPath,
        DownloadsDirectoryPath: DownloadsDirectoryPath
      }
    : {
        MainBundlePath: MainBundlePath,
        CachesDirectoryPath: NSCachesDirectoryPath,
        DocumentDirectoryPath: NSDocumentDirectoryPath,
        LibraryDirectoryPath: NSLibraryDirectoryPath
      };
};
if (Platform.OS === 'ios') {
  AudioUtils = {
    MainBundlePath: MainBundlePath,
    CachesDirectoryPath: NSCachesDirectoryPath,
    DocumentDirectoryPath: NSDocumentDirectoryPath,
    LibraryDirectoryPath: NSLibraryDirectoryPath
  };
} else if (Platform.OS === 'android') {
  AudioUtils = {
    MainBundlePath: MainBundlePath,
    CachesDirectoryPath: CachesDirectoryPath,
    DocumentDirectoryPath: DocumentDirectoryPath,
    LibraryDirectoryPath: LibraryDirectoryPath,
    PicturesDirectoryPath: PicturesDirectoryPath,
    MusicDirectoryPath: MusicDirectoryPath,
    DownloadsDirectoryPath: DownloadsDirectoryPath
  };
}

export default AudioUtils;
