
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#import <React/RCTLog.h>
#import <AVFoundation/AVFoundation.h>

@interface RNAudioRecorder : NSObject <RCTBridgeModule>

@end
  